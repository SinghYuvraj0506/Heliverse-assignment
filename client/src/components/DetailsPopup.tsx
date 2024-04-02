import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { setPopupData } from "@/store/features/generalSlice";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserPopupContent = () => {

  const userState = useSelector(state => state.users)


  return (
    <AlertDialogHeader>
      <div className="flex flex-col gap-10 items-center justify-center">
        <AlertDialogTitle>User Details</AlertDialogTitle>

        <div className="flex items-center gap-5">
        <Avatar>
          <AvatarImage src={userState?.selectedUserData?.avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div>
          <h3 className="text-xl font-semibold">{userState?.selectedUserData?.first_name + " " + userState?.selectedUserData?.last_name}</h3>
          <span className="text-sm">{userState?.selectedUserData?.email}</span>
        </div>
        </div>


        <section className="text-sm">
          <p>
          Domain : {userState?.selectedUserData?.domain}
          </p>
          <p>
          Gender : {userState?.selectedUserData?.gender}
          </p>
          <p>
          Availability : {userState?.selectedUserData?.available ? "Available" : "Not Available"}
          </p>
        </section>

      </div>
    </AlertDialogHeader>
  );
};

const DetailsPopup = () => {
  const generalState = useSelector((state) => state.general);
  const dispatch = useDispatch();

  return (
    <div>
      <AlertDialog open={generalState?.openPopup ?? false}>
        <AlertDialogContent>
          <UserPopupContent/>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                dispatch(setPopupData({ openPopup: false }));
              }}
            >
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DetailsPopup;
