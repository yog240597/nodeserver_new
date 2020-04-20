const express = require('express');
const crypto = require("crypto");
const router = express.Router();
const Kafka= require('../models/Kafka');

var mongoose = require('mongoose')
  , Schema = mongoose.Schema


router.get('/nbi/deviceAccount/topics/',(req,res)=>{
    
    Kafka.find(function(err, allaccount) {
            if (err){
                res.send(err);
            }
            else{
              res.json(allaccount);
          }
        });
});

router.get('/nbi/deviceAccount/topics/:_id',(req,res)=>{
    if(req.params._id.match(/^[0-9a-fA-F]{24}$/))
    {
        Kafka.findById(req.params._id, function(err, accountbyid) {
                if (err)
                    res.send(err);
                res.json({"HELLO":accountbyid});
            });
    }
    else
        {
            console.log("there is eror")
        }

});

// router.patch('/nbi/deviceAccount/:_id',(req,res)=>{

  	
// 	Account.findById(req.params._id, function(err, updateaccountbyid) {
//               if (err)
//                 res.send(err);

//             updateaccountbyid.username = req.body.username;  // update the bears info
//             updateaccountbyid.password = req.body.password;
//             updateaccountbyid.permissionLevel = req.body.permissionLevel;
//             // save the bear
//             updateaccountbyid.save(function(err) {
//                 if (err)
//                     res.send(err);

//                 res.json({ message: 'Account updated!' });
//             });
            
//         });


// });



router.delete('/nbi/deviceAccount/topics/:_id',(req,res)=>{
	
	Kafka.remove({
            _id: req.params._id
        }, function(err, deleteaccount) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
});

router.delete('/nbi/deviceAccount/topics/',(req,res)=>{
    
    Kafka.remove({
            _id: req.params._id
        }, function(err, deleteaccount) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
});


router.post('/nbi/deviceAccount/:accountid/topics',(req,res)=>{

const kafkas=new Kafka({
	accountid:req.body.accountid,
	kafkatopic:req.body.kafkatopic,
	topictype:req.body.topictype

});
kafkas.save()
.then(data=>{
  res.json({"topics":data});
})
.catch(err=>{
	res.json({message:err});
})
});


module.exports=router;