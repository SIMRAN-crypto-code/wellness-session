
const Session=require('../Models/Session')

const mysessions= async(req,res)=>{
    try{
        const sessions = await Session.find({ status: 'published' });
        res.json(sessions);
    }
    catch(err){
        res.status(500).json({err:'failed to fetch sessions'})
    }
}
const sessionpublish= async(req,res)=>{
    try{
        const sessions = await Session.find({ user_id: req.user.id });
    res.json(sessions);
    }
    catch(err){
        res.status(500).json({err:'failed to fetch user session'})
    }
}
const sessionview= async(req,res)=>{
    try{
        const session = await Session.findOne({
      _id: req.params.id,
      user_id: req.user.id
    });
    if (!session) return res.status(404).json({ error: 'Session not found' });
    res.json(session);
    }
    catch(err){
        res.status(500).json({err:'failed to view session'})
    }
}
const draft= async(req,res)=>{
     try {
    const { id, title, tags, json_file_url } = req.body;

    let session;
    if (id) {
      session = await Session.findOneAndUpdate(
        { _id: id, user_id: req.user.id },
        { title, tags, json_file_url, status: 'draft', updated_at: new Date() },
        { new: true }
      );
    } else {
      session = await Session.create({
        user_id: req.user.id,
        title,
        tags,
        json_file_url,
        status: 'draft',
        created_at: new Date()
      });
    }

    res.status(200).json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'failed to save draft' });
  }
}
const publish= async(req,res)=>{
    try{
        const { id } = req.body;

    const session = await Session.findOneAndUpdate(
      { _id: id, user_id: req.user.id },
      { status: 'published', updated_at: Date.now() },
      { new: true }
    );

    if (!session) return res.status(404).json({ error: 'Session not found' });

    res.json(session);
    }
    catch(err){
        res.status(500).json({err:'failed to publish'})
    }
}

module.exports={mysessions,sessionpublish,sessionview,draft,publish}
