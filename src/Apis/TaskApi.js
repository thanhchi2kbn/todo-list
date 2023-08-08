import axios from "axios";
const url = "http://localhost:4000"
export const TaskApi = {

    getAllTasks: async (params) => {
        try {
            const res = await axios.get(`${url}/tasks`, {
                params: {
                    _sort: "createAt",
                    _order: "desc",
                    ...params,
                },
            });
            return res;
        }
        catch (error) {
            console.log(error);
        }
    },

    createTask: async (task) => {
        try {
            await axios.post(`${url}/tasks`, task)
        } catch (error) {
            console.log(error);
        }
    },

    removeTask: async (id) => {
        try {
            await axios.delete(`${url}/tasks/${id}`)
        } catch (error) {
            console.log(error);
        }
    },

    updateTask: async (taskId, updatedTask) => {
        try {
            await axios.put(`${url}/tasks/${taskId}`, updatedTask);
        } catch (error) {
            console.log(error);
        }
    },

    clearAllTasks: async () => {
        try {
            // Gửi yêu cầu xoá tất cả công việc đến API hoặc cơ sở dữ liệu
            // ở đây chúng ta sẽ gửi một request DELETE đến API
            await axios.delete(`${url}/tasks`);
        } catch (error) {
            console.log(error);
            throw new Error("Failed to clear all tasks.");
        }
    },
};