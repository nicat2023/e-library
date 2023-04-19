import express  from "express";
import mongoose,{Schema} from "mongoose";
const app=express()

mongoose.connect('mongodb+srv://nicat:nicat@cluster0.r2ciceu.mongodb.net/?retryWrites=true&w=majority')


const  bookSchema = new mongoose.Schema({
    bookName : String,
    bookPage : Number ,
    bookPublishYear : Number,
    bookPublisher : String
})

const bookModel = mongoose.model('book',bookSchema)

app.use(express.json())
app.post('/book',(req,res)=>{
    const body = req.body
   bookModel.create(body).then(()=>{
    res.send('istfadeci yerledirildi')
   })
})

app.get('/book',async(req,res)=>{
 const data= await bookModel.find()
 res.send(data)
})

app.get('/book/:id',async(req,res)=>{
    const { id } = req.params
    const data = await bookModel.findById(id)
    res.send(data)
})

app.delete('/book/:id',async(req,res)=>{
    const { id } = req.params
   const data = await bookModel.findByIdAndDelete(id)
res.send('istfadeci silindi')
})

app.put('/book/: id', async(req,res)=>{
    const {id}=  req.params
    await bookModel.findByIdAndUpdate(id,{
        $set : req.body
    })
    res.send('istfadeci deyisildi')
})

app.listen(5600,()=>{
    console.log('server is up...')
})