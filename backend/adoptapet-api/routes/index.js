var router=require('express').Router();

router.get('/', (req,res) => {
    res.send('Welcome to adoptapet')
})

router.use('/usuarios',require('./usuarios'));

module.exports=router;