import {reactive} from 'vue'
import axios from "axios";
import {baseURL, headers} from "@/lib/utils.js";

export const store = reactive({
    user: JSON.parse(localStorage.getItem('user')),
    logout(){
        // this.user = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    },
    vehicales: [],
    async getVehicles() {
        const res = await axios.get(`${baseURL}/vehicales`, {
            headers: headers()
        });
        if(res.data){
            this.vehicales = res.data.data
        }
    }
})