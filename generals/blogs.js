

var post = [];

const addPost = (title, content) =>{
    post.push({
        id: post.length + 1,
        title,
        content,
        date: new Date(),
        comments:[]
    })
}

const addComment = (postId, userName, comment)=>{
    
    
    post[postId -1].comments.push({        
        userName,
        comment, 
        date:new Date()
    });
}


addPost("New Event", "fjd f jfdl hh hdfg");
addPost("Netflix Series is cool", "fjd f jfdl hh hdfg");

addComment(1, "test@yaho.com", "This is pretty coold" );
addComment(1, "fdf@yaho.com", "I love it" );
addComment(1, "kll@yaho.com", "good " );
addComment(1, "mm@yaho.com", "I hate" );
addComment(1, "ppp@yaho.com", "far enough" );
addComment(1, "ttrrr@yaho.com", "not so bad" );


for(var i =0; i < post.length; i++){
    console.log((i+1),")=============================================", post[i].date);
    console.log(post[i].title, post[i].content);

    console.log("Comments=============================================");
    for(var j =0; j< post[i].comments.length; j ++){
        var comment  = post[i].comments[j];
        console.log("user: ", comment.userName, " Comment: ", comment.comment, " Date: ", comment.date);
    }
}