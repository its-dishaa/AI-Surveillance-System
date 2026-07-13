import { useState } from "react";
import {
  UserCircle,
  Mail,
  Shield,
  Phone,
  MapPin,
  Camera,
  Video,
  Activity,
  Save,
  Lock,
  LogOut,
  X,
  CheckCircle,
} from "lucide-react";


function Profile() {


  const initialProfile = {
    name: "Admin",
    email: "admin@surveillance.com",
    phone: "+91 9876543210",
    location: "New Delhi, India",
    department: "Security Operations",
    company: "AI Surveillance Pvt Ltd",
    role: "System Administrator",
    joined: "January 2026",
  };


  const [profile,setProfile] = useState(initialProfile);

  const [oldProfile,setOldProfile] = useState(initialProfile);

  const [editing,setEditing] = useState(false);

  const [twoFA,setTwoFA] = useState(false);

  const [showPassword,setShowPassword] = useState(false);


  const [password,setPassword] = useState({
    old:"",
    new:"",
    confirm:""
  });



  const stats=[
    {
      title:"Cameras Managed",
      value:18,
      icon:<Camera size={30}/>,
      color:"text-blue-600"
    },
    {
      title:"Videos Processed",
      value:142,
      icon:<Video size={30}/>,
      color:"text-green-600"
    },
    {
      title:"Events Detected",
      value:421,
      icon:<Activity size={30}/>,
      color:"text-red-600"
    },
    {
      title:"Access Level",
      value:"Admin",
      icon:<Shield size={30}/>,
      color:"text-purple-600"
    }
  ];



  const activities=[
    "Logged into dashboard",
    "Uploaded CCTV footage parking.mp4",
    "Added Camera Lobby-1",
    "Reviewed security alert",
  ];



  function handleChange(e){

    setProfile({
      ...profile,
      [e.target.name]:e.target.value
    });

  }



  function enableEdit(){

    setOldProfile(profile);
    setEditing(true);

  }



  function cancelEdit(){

    setProfile(oldProfile);
    setEditing(false);

  }



  function saveProfile(){

    setEditing(false);

    alert("Profile updated successfully");

  }



  function updatePassword(){

    if(password.new!==password.confirm)
    {
      alert("New passwords do not match");
      return;
    }


    alert("Password changed successfully");

    setShowPassword(false);

    setPassword({
      old:"",
      new:"",
      confirm:""
    });

  }



  function logout(){

    alert("Logged out from all devices");

  }




return (

<div className="space-y-6 text-black">


{/* PROFILE HEADER */}

<div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow">


<div className="flex flex-col md:flex-row gap-6 items-center">


<UserCircle size={120}/>


<div className="flex-1">


<h1 className="text-4xl font-bold">
{profile.name}
</h1>


<p className="text-lg opacity-90">
{profile.role}
</p>


<div className="mt-4 space-y-2">


<div className="flex gap-2 items-center">
<Mail size={16}/>
{profile.email}
</div>


<div className="flex gap-2 items-center">
<Phone size={16}/>
{profile.phone}
</div>


<div className="flex gap-2 items-center">
<MapPin size={16}/>
{profile.location}
</div>


</div>


</div>


<button

onClick={editing ? cancelEdit : enableEdit}

className="bg-white text-blue-700 px-5 py-3 rounded-lg font-semibold"

>

{
editing ? "Cancel" : "Edit Profile"
}


</button>


</div>


</div>





{/* STATISTICS */}


<div className="grid md:grid-cols-4 gap-6">


{
stats.map((item,index)=>(


<div
key={index}
className="bg-white rounded-xl shadow p-6"
>


<div className={item.color}>
{item.icon}
</div>


<h2 className="text-3xl font-bold mt-3">
{item.value}
</h2>


<p className="text-gray-500">
{item.title}
</p>


</div>


))
}


</div>





{/* PERSONAL INFORMATION */}



<div className="bg-white rounded-xl shadow p-8">


<div className="flex justify-between items-center mb-6">


<h2 className="text-2xl font-bold">
Personal Information
</h2>



{
editing &&

<button

onClick={saveProfile}

className="flex gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg"

>

<Save size={18}/>
Save

</button>

}


</div>





<div className="grid md:grid-cols-2 gap-6">



{

[
["name","Full Name"],
["email","Email"],
["phone","Phone"],
["location","Location"],
["department","Department"],
["company","Company"]

].map(([key,label])=>(


<div key={key}>


<label className="font-semibold">
{label}
</label>


<input

name={key}

value={profile[key] || ""}

disabled={!editing}

onChange={handleChange}

className="
w-full
mt-2
p-3
border
rounded-lg
disabled:bg-gray-100
"


/>


</div>



))


}



</div>



</div>







{/* SECURITY */}


<div className="bg-white rounded-xl shadow p-8">


<h2 className="text-2xl font-bold mb-6">
Security
</h2>



<div className="space-y-4">



<button

onClick={()=>setShowPassword(true)}

className="flex items-center gap-3 w-full border p-4 rounded-lg hover:bg-gray-50"

>

<Lock/>

Change Password

</button>





<button

onClick={()=>setTwoFA(!twoFA)}

className="flex justify-between items-center w-full border p-4 rounded-lg"

>


<span>
Two Factor Authentication
</span>



{

twoFA ?

<CheckCircle className="text-green-600"/>

:

<span className="text-gray-500">
OFF
</span>

}



</button>





<button

onClick={logout}

className="flex gap-3 items-center w-full border border-red-300 text-red-600 p-4 rounded-lg"

>

<LogOut/>

Logout From All Devices

</button>



</div>



</div>







{/* PASSWORD POPUP */}



{

showPassword &&


<div className="fixed inset-0 bg-black/40 flex items-center justify-center">


<div className="bg-white p-8 rounded-xl w-96">


<div className="flex justify-between">

<h2 className="text-xl font-bold">
Change Password
</h2>


<X
className="cursor-pointer"
onClick={()=>setShowPassword(false)}
/>


</div>




<input

type="password"

placeholder="Old Password"

className="border p-3 w-full mt-4 rounded"

onChange={(e)=>
setPassword({...password,old:e.target.value})
}

/>



<input

type="password"

placeholder="New Password"

className="border p-3 w-full mt-4 rounded"

onChange={(e)=>
setPassword({...password,new:e.target.value})
}

/>



<input

type="password"

placeholder="Confirm Password"

className="border p-3 w-full mt-4 rounded"

onChange={(e)=>
setPassword({...password,confirm:e.target.value})
}

/>




<button

onClick={updatePassword}

className="bg-blue-600 text-white w-full mt-5 py-3 rounded-lg"

>

Update Password

</button>



</div>


</div>


}






{/* ACTIVITY */}


<div className="bg-white rounded-xl shadow p-8">


<h2 className="text-2xl font-bold mb-6">
Recent Activity
</h2>


{

activities.map((item,index)=>(


<div
key={index}
className="border-l-4 border-blue-600 pl-4 mb-5"
>

<p>
{item}
</p>


<span className="text-sm text-gray-500">
{index+1} hours ago
</span>


</div>


))


}


</div>



</div>


);

}


export default Profile;