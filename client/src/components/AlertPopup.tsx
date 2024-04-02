import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteUser } from "@/store/actions/userActions";
import { setAlertData } from "@/store/features/generalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "./ui/use-toast";

const AlertPopup = () => {
  const generalState = useSelector((state) => state.general);
  const dispatch = useDispatch()
  const {toast} = useToast()

  const handleClose = () =>{
    dispatch(setAlertData({value:false,id:null}))
  }

  const handleDeleteUser = async () =>{
    const data = await  dispatch(deleteUser(generalState?.openDeleteAlert?.id))

    if (data?.payload?.success) {
        toast({
          title: "User Deleted Successfully!!!!",
          duration: 2000,
        });
          handleClose();
      } else {
        toast({
          title: "Some Error Occured, Try Again!!!",
          duration: 2000,
        });
      }

  }

  return (
    <AlertDialog open={generalState?.openDeleteAlert?.value}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete user from
            our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteUser}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertPopup;
