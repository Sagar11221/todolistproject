
// module.exports.getdate=getdate;
// function getdate(){
// let today = new Date();
// // var currentday = today.getDay();
//
//
// let options={
//   weekday:"long",
//   day:"numeric",
//   month:"long",
// };
// let day=today.toLocaleDateString("en-IN",options);
// return day;
// }
// module.exports.getday=getday;
// function getday(){
// let today = new Date();
// // var currentday = today.getDay();
//
//
// let options={
//   weekday:"long",
// };
// let day=today.toLocaleDateString("en-IN",options);
// return day;
// }

//SAME THING AS ABOVE INORDER TO SHORT IT ANOTHER WAY OF WRITING THE CODE::--

module.exports.getdate=function getdate(){
let today = new Date();
// var currentday = today.getDay();
let options={
  weekday:"long",
  day:"numeric",
  month:"long",
}
let day=today.toLocaleDateString("en-IN",options);
return day;
};
module.exports.getday=function getday(){
let today = new Date();
// var currentday = today.getDay();


let options={
  weekday:"long",
};
let day=today.toLocaleDateString("en-IN",options);
return day;
};
