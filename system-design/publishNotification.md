# PUBLISH NOTIFICATION

## Challange

design system. How would design a system that publish  million of notifications to devices across the world, how can you make sure the message was not lost, how do you scale horiontaly? how do you make the message was received? I would like to schedule message to the future, how do you implement that? Give the details about it. what database would you use to scalate? How do you make sure the message didn't send twice to the same user? How would you costumize a message for a user?

## SOLUTION

Designing a **globally scalable, reliable, and customizable notification system** that can:

* Send **millions of notifications across the world**
* Ensure **message delivery guarantees**
* **Scale horizontally**
* **Schedule** messages into the future
* **Avoid duplication**
* Support **per-user customization**

is a **distributed systems problem** that touches on messaging, queuing, persistence, scheduling, idempotency, and observability.

---

### 🔧 **High-Level System Architecture**

```
                +-------------+
                | Admin UI /  |
                | API Gateway |
                +------+------+
                       |
            +----------v-----------+
            | Notification Service |
            +----------+-----------+
                       |
        +--------------+---------------+
        |                              |
+-------v--------+           +---------v-------+
| Scheduling Svc |           | Notification Bus|
+----------------+           +--------+--------+
                                        |
                              +---------v---------+
                              | Worker Consumers  |
                              +---------+---------+
                                        |
                     +------------------+------------------+
                     |                                     |
        +------------v-------------+       +---------------v------------+
        | Device Push Service APIs |       | Delivery Tracking & Retry |
        +------------+-------------+       +---------------+------------+
                     |                                     |
        +------------v-------------+       +---------------v------------+
        | Apple, Google, Web Push  |       |      Logging, Metrics      |
        +--------------------------+       +----------------------------+

```

---

## 📌 1. **Message Persistence**

**Use case**: Messages must never be lost.

**Solution**: Store every message in a durable data store *before* sending.

* **Database**: Use **Apache Cassandra** or **CockroachDB** (both are horizontally scalable and support high write throughput).

  * Alternative: Use **DynamoDB** with TTL + GSI if you're on AWS.
* Include message metadata: ID, payload, user\_id, scheduled\_time, status (PENDING/SENT/FAILED), deduplication\_id, retries, etc.

---

## 📌 2. **Message Queuing and Horizontal Scaling**

**Use case**: System must scale to millions of notifications.

**Solution**: Use **distributed queues** + **worker pools**:

* **Queue**: Kafka, Pulsar, or AWS SQS + SNS

  * Supports partitioning, replication, message ordering, and consumer groups
* **Consumers**: Stateless workers in a Kubernetes cluster (auto-scaled)

This allows **horizontal scaling** by simply adding more consumers.

---

## 📌 3. **Delivery Guarantees**

**Use case**: Ensure messages are received (or retried).

**Solution**:

* Implement **acknowledgment callbacks**:

  * For Apple/Google/WebPush: wait for success/failure callbacks from their APIs.
* If failed:

  * Retry with exponential backoff
  * Mark as DEAD after `N` retries (store in dead-letter queue)

---

## 📌 4. **Future Scheduling**

**Use case**: Allow sending notifications at specific times.

**Solution**:

* Store all scheduled messages in DB with `scheduled_time`
* Two approaches:

  1. **Polling-based Scheduler**:

     * Every second, poll DB for messages where `scheduled_time <= now` and status = `PENDING`
     * Use **time-indexed DB** like Cassandra for fast range queries
  2. **Distributed Delayed Queues** (more efficient):

     * Use Redis Sorted Set (score = timestamp), or Kafka with delay topics

---

## 📌 5. **Idempotency & Duplicate Avoidance**

**Use case**: Avoid sending duplicate messages to the same user.

**Solution**:

* Use a **`deduplication_id`** (e.g., message UUID + user ID)
* Before sending a message:

  * Check if this `deduplication_id` already exists in a "sent" table or Redis
* Store sent state in **idempotent DB** or **cache with TTL**

---

## 📌 6. **Message Customization Per User**

**Use case**: Personalize messages like "Hi Alice, your order is ready!"

**Solution**:

* Use **templating system** (e.g., Handlebars, Jinja2):

  ```json
  "template": "Hi {{name}}, your order {{order_id}} is ready!"
  ```
* Fetch user profile (name, order info) from **User Service** or **cache** at runtime
* Apply template per user before enqueueing or sending

Use **pre-rendered** messages if latency is critical (render before queuing).

---

## 📌 7. **Preventing Multiple Sends on Retry**

**Problem**: If a retry occurs, how to avoid sending the same message again?

**Solution**:

* Store status per `message_id` and `user_id`
* Use **atomic operations**:

  * Set status to `SENT` only after confirmed delivery
  * Use **compare-and-set** or transactions to avoid race conditions
* Lock using Redis or DB unique constraint

---

## 📌 8. **Monitoring & Observability**

You need full observability:

* **Metrics**:

  * Sent rate, failure rate, retries, delivery latency
* **Tracing**:

  * Trace from message creation → render → queue → delivery
* **Alerting**:

  * Dead-letter queue growth
  * Retry spikes
  * High latency

Use tools like:

* Prometheus + Grafana
* ELK Stack / OpenTelemetry

---

## ✅ Summary Table

| Feature                  | Solution                               |
| ------------------------ | -------------------------------------- |
| Scale to millions        | Kafka + stateless workers              |
| Ensure delivery          | API callbacks + retries + tracking     |
| Future scheduling        | Scheduler with Redis/Cassandra polling |
| Deduplication            | Deduplication ID + Redis/DB            |
| Horizontal scalability   | Stateless microservices + K8s + queue  |
| Custom messages per user | Templates + user data injection        |
| Delivery guarantee       | Durable DB + retry policies            |
| Observability            | Logs, Metrics, Alerts, Dashboards      |
| Database                 | Cassandra, DynamoDB, or CockroachDB    |

---

Let me know if you want a specific implementation in **Go**, **Node.js**, or **Python**, or deployment on **AWS/GCP**.


## Avoid Duplication

Sure! Let me explain this in **very simple English**:

---

### 🧠 **Goal:**

You want to make sure that **each user only gets the message once** — not two or more times, even if your system retries.

---

### ✅ **Simple Trick (Deduplication ID):**

Before sending a message to a user, you **create a special ID** called a **deduplication ID**.

This ID is made by combining:

* The **message ID** (what you're trying to send)
* The **user ID** (who you're sending it to)

For example:

```
deduplication_id = "message123-user456"
```

---

### 🔍 **Before sending the message:**

You do this:

1. **Check a database or a fast cache** (like Redis):

   > "Did I already send this `deduplication_id`?"

2. If **yes**, then:

   > "Oops! Already sent it — skip this one."

3. If **no**, then:

   > "OK, send it now — and remember I sent it!"

---

### 💾 **After sending:**

You **save the deduplication ID** in the database or cache to say:

> "I already sent this."

If you use a **cache**, like Redis, you can even say:

> "Remember I sent this for the next 24 hours."

This way, even if something goes wrong and the system tries again, you **don’t send the same message twice**.

---

### ✅ Final Summary:

| Step | What You Do                                  |
| ---- | -------------------------------------------- |
| 1    | Make a special ID using message ID + user ID |
| 2    | Check if this ID was already used            |
| 3    | If not used, send the message                |
| 4    | Save that ID to avoid sending it again       |

Let me know if you'd like a code example!
