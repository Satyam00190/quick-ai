import { useEffect, useState } from "react";
import { dummyCreationData } from "../assets/assets";
import { Gem, Sparkles } from "lucide-react";
import { Protect, useAuth } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";
import axios from 'axios';
import toast from "react-hot-toast";
const Dashboard = () => {
    const [creations, setCreations] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getToken } = useAuth();

    const getDashBoardData = async () => {
        try {
            const { data } = await axios.get('/api/user/get-user-creations', {
                headers: { Authorization: `Bearer ${await getToken()}` }

            })

            if (data.success) {
                setCreations(data.creations)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(data.message);
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        getDashBoardData();
    }, [])
    return (
        <div className="h-full overflow-y-scroll p-6">
            <div className="flex justify-start gap-4 flex-wrap">
                {/* //Total creation card  */}

                <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">

                    <div className="text-slate-600 ">
                        <p className="text-sm">Total creation</p>
                        <h2 className="text-xl font-semibold">{creations.length}</h2>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br form-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center">
                        <Sparkles className="w-5 text-white" />
                    </div>
                </div>

                {/* Active plan card  */}

                <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">

                    <div className="text-slate-600 ">
                        <p className="text-sm">Active plan</p>
                        <Protect plan='premium' fallback="Free" >Premium</Protect>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br form-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center">
                        <Gem className="w-5 text-white" />
                    </div>
                </div>

            </div>
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <span className="w-10 h-10 my-1 rounded-full border-3 border-t-transparent border-primary animate-spin"></span>
                </div>
            )
                : (<div className="space-y-3">
                    <p className="mt-6 mb-4">Recent Creations</p>
                    {
                        creations.map((item, index) => <CreationItem key={index} item={item} />)
                    }
                </div>)}


        </div>
    )
}

export default Dashboard;