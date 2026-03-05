import { createNotice, deleteNotice, getAllNotices, updateNotice } from "../services/notice.service.js";

export const createNewNotice = async (req,res)=>{
    try {
        const {title, content}= req.body;
        const noticeId= await createNotice({
            title,
            content,
            created_by: req.user.id,
        });

        res.status(201).json({message : "Notice created Successfully",
            noticeId,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Server error"});
    }
};

export const getNotices = async (req, res) => { 
    try {
        const notices = await getAllNotices();
        res.json(notices);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "server error"});
    }
};

export const editNotice = async (req, res) => {
    try {
        const {id} = req.params;
        const {titlr, content}= req.body;

        const updated = await updateNotice(id,{title, content});

        if(!updated){
            return res.status(404).json({message : "Notice not found"});
        }

        res.json({message : "Notice Updated Successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Server error"});
    }
};

export const removeNotice = async (req, res) =>{
    try {
        const {id} =req.params;
        const deleted= await deleteNotice(id);

        if(!deleted){
            return res.status(404).json("Notice not found");
        }

        res.json({message :"Notice deleted Successful"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message : "Server error"});
    }
};