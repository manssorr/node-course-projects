import connectDB from '../src/db/mongoose.mjs';
import Task from '../src/models/task.mjs';

connectDB()

// Task.findByIdAndDelete('5c1a63e8f0d4c50656c5ab28').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('someId:iasncoidsnncoids98').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})