module.exports = (router)=>{
    router.get('/', (req,res)=>{
        res.status(200);
        res.json({ status: 'Up and Running!' });
      });
}