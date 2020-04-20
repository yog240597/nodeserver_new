const express = require('express');
const crypto = require("crypto");
const router = express.Router();
const Account= require('../models/Account');

router.get('/nbi/deviceAccount/',(req,res)=>{
	
	Account.find(function(err, allaccount) {
            if (err){
                res.send(err);
            }
            else{
              res.json(allaccount);
          }
        });
});

router.get('/nbi/deviceAccount/:_id',(req,res)=>{
	
	Account.findById(req.params._id, function(err, accountbyid) {
            if (err)
                res.send(err);
            res.json(accountbyid);
        });
});

router.patch('/nbi/deviceAccount/:_id',(req,res)=>{

  	
	Account.findById(req.params._id, function(err, updateaccountbyid) {
              if (err)
                res.send(err);

            updateaccountbyid.username = req.body.username;  // update the bears info
            updateaccountbyid.password = req.body.password;
            updateaccountbyid.permissionLevel = req.body.permissionLevel;
            // save the bear
            updateaccountbyid.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Account updated!' });
            });
            
        });


});



router.delete('/nbi/deviceAccount/:_id',(req,res)=>{
	
	Account.remove({
            _id: req.params._id
        }, function(err, deleteaccount) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
});


router.post('/nbi/deviceAccount',(req,res)=>{

const accounts=new Account({
	username:req.body.username,
	password:req.body.password,
	lastchanged:req.body.lastchanged,
	permissionLevel:req.body.permissionLevel,
	folderURL:req.body.folderURL
});
accounts.save()
.then(data=>{
  res.json({"id":crypto.randomBytes(8).toString("hex")});
})
.catch(err=>{
	res.json({message:err});
})
});


module.exports=router;