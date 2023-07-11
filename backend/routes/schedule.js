const router = require('express').Router();

// const { events } = require('../models/scheduleSchema');


router.post("/", async (req,res)=>{
    const newSchedule = new Schedule(req.body)

    try{
        const savedSchedule = await newSchedule.save();
        res.status(200).json(savedSchedule);        

    }catch(err){
        res.status(500).json(err);
    }
})

router.get('/show', async(req,res)=>{
    try{
        const allSchedules = await Schedule.find();

        res.status(200).send(allSchedules);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.put('/addevent/:scheduleId', async(req,res)=>{

    //req.body
    //scheduleId eventId

    Schedule.findOne(
        {_id:req.params.scheduleId}
    )
    .then(doc =>{
        if(!doc){return res.status(404).end();}

        //check if event already present
        if(doc.events.includes(req.body.eventId)){
            res.status(402).json("event already in schedule");
        }else {
            Schedule.findOneAndUpdate(
                {_id: req.body.scheduleId},
                {$push:{events: req.body.eventId}}
            )
            .then( doc =>{
                if(!doc){return res.status(404).end();}
                return res.status(200).json(doc);
            })
            .catch(err=>{
                console.log(err);
            })
        }
    })
    .catch(err=>{
        console.log(err)
    })
    
})

router.post('/events', async (req,res)=>{
    try{
        const sched = await Schedule.findOne(
            {_id: req.body.scheduleId}
        )
        
    }
    catch(err){

    }
})
module.exports = router; 