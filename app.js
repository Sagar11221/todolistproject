const express = require("express");
const bodyParser = require("body-parser");
const date=require(__dirname+"/date.js");
const mongoose=require("mongoose");
const _=require("lodash");
const app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

  let lists=["cook","eat","drink"];
  let worklistitems=[];

mongoose.connect("mongodb+srv://admin-sagar:sagar@17@cluster0.t9yec.mongodb.net/todolistDB",{useNewUrlParser:true});

const itemsSchema = {
  name:String,
};

const Item=mongoose.model("Item",itemsSchema);
  const item1=new Item({
    name:"Welcome to our todolist",
  });

  const item2=new Item({
    name:"Hit this +  button",
  });

  const item3=new Item({
    name:"<--Hit this to delete",
  });

  const defaultitems=[item1,item2,item3];


app.get("/", function(req, res) {

  // if(currentday===6 || currentday===0){
  // day="weekend";
  // }else{
  // day="weekday"
  // }
//
//   switch (currentday) {
//     case 0:
//       day = "Sunday";
//       break;
//     case 1:
//       day = " Monday";
//       break;
//     case 2:
//       day = "Tuesday";
//       break;
//     case 3:
//       day = "Wednesday";
//       break;
//     case 4:
//       day = "Thursday";
//       break;
//     case 5:
//       day = "Friday";
//       break;
//     case 6:
//       day = "Saturday";
//       break;
//     default:
// console.log("Their is no 8 day");
//   }
// let day=date.getdate();

Item.find({},function(err,finditems){
  if (finditems.length===0) {
    Item.insertMany(defaultitems,function(err){
      if (err) {
        console.log(err);
      }else{
        console.log("Successfully saved default items to DB");
      }
    });
    res.redirect("/");
  }else{

      res.render("list", {
          listtitle:"Today",newlistitems:finditems
        });
  }
})
});


app.post("/",function(req,res){
const itemName=req.body.name1;
const listName=req.body.list;

  const item=new Item({
    name:itemName,
  });

if(listName==="Today"){
  item.save();
  res.redirect("/");
}else{
  List.findOne({name:listName},function(err,findlist){
    findlist.item.push(item);
    findlist.save();
    res.redirect("/"+listName);
  })
}
// if(req.body.list==="worklist"){
//   worklistitems.push(item);
//   res.redirect("/work");
// }else{
// lists.push(item);
// res.redirect("/");
// }
});
app.post("/delete",function(req,res){
  const checkeditemid=req.body.checkbox;
  const listName=req.body.listName;

  if(listName==="Today"){
    Item.findByIdAndRemove(checkeditemid,function(err){
      if(!err){
        console.log("Successfully deleted the checked item");
        res.redirect("/");
      }
    })
  }else{
    List.findOneAndUpdate({name:listName},{$pull:{item:{_id:checkeditemid}}},function(err,results){
      if(!err){
        console.log("Successfully deleted the checked item");
        res.redirect("/"+listName);
      }
    })
  }

})
// app.get("/work",function(req,res){
//   res.render("list",{listtitle:"worklist",newlistitems:worklistitems})
// });
//
// app.post("/work",function(req,res){
//   let worklist=req.body.name1;
//   worklistitems.push(worklist);
//   res.redirect("/work");
// });
const listSchema={
  name:String,
  item:[itemsSchema],
};

const List=mongoose.model("List",listSchema);

app.get("/:customlistname",function(req,res){
  const customListName=_.capitalize(req.params.customlistname);

  List.findOne({name:customListName},function(err,findList){
          if (!err) {
          if(!findList){
            //create a new list
                const list=new List({
                  name:customListName,
                  item:defaultitems,
                })
                list.save();
                res.redirect("/"+customListName);
          }else{
              //show an existing list
              res.render("list",{listtitle:findList.name,newlistitems:findList.item});
          }
        }
      });
  })

let port=process.env.PORT;
if(port==null || port==""){
  port:3000;
}


app.listen(port, function() {
  console.log("server is running");
});
