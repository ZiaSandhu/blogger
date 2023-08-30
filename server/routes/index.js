const router = require('express').Router()

router.get('/',(req,res)=>{
    res.json({msg:'Local host 5000'})
})

module.exports = router