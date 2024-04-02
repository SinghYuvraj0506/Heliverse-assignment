import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiDotsVertical } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { setAlertData, setDialogFormData, setPopupData } from "@/store/features/generalSlice";
import { getUserData } from "@/store/actions/userActions";


const Cardtags: React.FC<{ value: string }> = ({ value }) => {
  return (
    <span
      className={`rounded-md px-2 py-1 text-xs ${
        [
          "bg-[#16712a]",
          "bg-[#8f9a35]",
          "bg-[#3d806e]",
          "bg-[#B3272D]",
          "bg-[#633698]",
        ][Math.ceil(Math.random() * 4)]
      }`}
    >
      {value}
    </span>
  );
};

const UserCards: React.FC<{
  fullName: string;
  avatar: string;
  gender: string;
  domain: string;
  available: boolean;
  id:string
}> = ({ fullName, avatar, gender, domain, available, id }) => {

  const dispatch = useDispatch()

  const handleEdit = (e) =>{
    e?.stopPropagation()
    dispatch(getUserData(id));
    dispatch(setDialogFormData({openDialogForm:true,DialogFormType:{value:"updateUser",id:id}}))
  }

  const handleDelete = (e) =>{
    e?.stopPropagation()
    dispatch(setAlertData({value:true,id:id}))
  }
  
  return (
    <>
    <Card className="cursor-pointer" onClick={()=>{dispatch(setPopupData({openPopup:true,popupType:"user"}));
    dispatch(getUserData(id))}}>
      <CardHeader className="flex-row items-center gap-5 relative">
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <CardTitle>{fullName ?? "---"}</CardTitle>

        <div className="absolute right-5">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <HiDotsVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardFooter className="gap-5 flex items-center w-full flex-wrap">
        <Cardtags value={gender} />
        <Cardtags value={domain} />
        <Cardtags value={available ? "Available" : "Not Available"} />
      </CardFooter>
    </Card>
    </>
  );
};

export default UserCards;
