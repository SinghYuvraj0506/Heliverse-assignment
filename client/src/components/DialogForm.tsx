import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AvailableDomains, AvailableGenders, HOST_URL } from "@/lib/constants";
import {
  createUser,
  updateUser,
} from "@/store/actions/userActions";
import { setDialogFormData } from "@/store/features/generalSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { createTeam } from "@/store/actions/teamActions";

const UserForm = ({ type, id }) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const userState = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    domain: "",
    available: "",
  });

  const handleChange = (value: string, name: string) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (id && type==="update") {
      setFormData({ ...userState?.selectedUserData });
    }
  }, [userState]);


  const handleSubmit = async (e) => {
    e?.preventDefault();
    const data = await dispatch(createUser(formData));

    if (data?.payload?.success) {
      toast({
        title: "User Created Successfully!!!!",
        duration: 2000,
      });
        dispatch(
          setDialogFormData({ openDialogForm: false, DialogFormType: null })
        )
    } else {
      toast({
        title: "Some Error Occured, Try Again!!!",
        duration: 2000,
      });
    }
  };

  const handleUpdate = async (e) => {
    e?.preventDefault();
    const data = await dispatch(updateUser({ ...formData, id: id }));

    if (data?.payload?.success) {
      toast({
        title: "User Updated Successfully!!!!",
        duration: 2000,
      });
      dispatch(
        setDialogFormData({ openDialogForm: false, DialogFormType: null })
      );
    } else {
      toast({
        title: "Some Error Occured, Try Again!!!",
        duration: 2000,
      });
    }
  };

  const handleFormClose = () => {
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      gender: "",
      domain: "",
      available: "",
    });
    dispatch(
      setDialogFormData({
        openDialogForm: false,
        DialogFormType: null,
      })
    );
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          {type === "update" ? "Update" : "Create"} User
        </DialogTitle>
        <DialogDescription>
          {type === "update" ? "Update" : "Create new"} user. Click save when
          you're done.
        </DialogDescription>
      </DialogHeader>
      <form
        className="grid gap-4 py-4"
        onSubmit={type === "update" ? handleUpdate : handleSubmit}
      >
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="first_name" className="text-right">
            First Name
          </Label>
          <Input
            id="first_name"
            className="col-span-3"
            required
            value={formData?.first_name}
            onChange={(e) => {
              handleChange(e.target.value, e.target.id);
            }}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="last_name" className="text-right">
            Last Name
          </Label>
          <Input
            id="last_name"
            className="col-span-3"
            required
            value={formData?.last_name}
            onChange={(e) => {
              handleChange(e.target.value, e.target.id);
            }}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            className="col-span-3"
            required
            value={formData?.email}
            onChange={(e) => {
              handleChange(e.target.value, e.target.id);
            }}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="gender" className="text-right">
            Gender
          </Label>
          <Select
            required
            value={formData?.gender}
            onValueChange={(e) => {
              handleChange(e, "gender");
            }}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {AvailableGenders?.map((e, i) => {
                return (
                  <SelectItem value={e} key={`gender${i}`}>
                    {e}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Domain
          </Label>
          <Select
            required
            value={formData?.domain}
            onValueChange={(e) => {
              handleChange(e, "domain");
            }}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {AvailableDomains?.map((e, i) => {
                return (
                  <SelectItem value={e} key={`domains${i}`}>
                    {e}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Availability
          </Label>
          <Select
            required
            value={formData?.available}
            onValueChange={(e) => {
              handleChange(e, "available");
            }}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Available</SelectItem>
              <SelectItem value="false">Not Available</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter className="flex-row sm:justify-end justify-center gap-5">
          <Button onClick={handleFormClose}>Close</Button>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

const TeamForm = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    users: [],
  });

  const [searchedData, setSearchedData] = useState([]);
  const [checkUniqueDomains, setCheckUniqueDomains] = useState({});

  const handleChange = (value: string, name: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleInput = async (e) => {
    const response = await fetch(
      `${HOST_URL}/api/users?search=` + e.target.value
    );
    const result = await response.json();

    setSearchedData(result?.data?.data);
  };

  const handleSubmit = async (e) => {
    try {
      e?.preventDefault();
      if (formData?.users?.length === 0) {
        toast({
          description: "Select some users",
        });
        return;
      }

      const data = await dispatch(createTeam(formData));

      if (data?.payload?.success) {
        toast({
          title: "Team Created Successfully!!!!",
          duration: 2000,
        });
        dispatch(
          dispatch(
            setDialogFormData({ openDialogForm: false, DialogFormType: null })
          )
        );
      } else {
        toast({
          title: "Some Error Occured, Try Again!!!",
          duration: 2000,
        });
      }
    } catch (error) {
      toast({
        title: "Some Error Occured, Try Again!!!",
        duration: 2000,
      });
    }
  };

  const handleAddUsers = (value, domain) => {
    const index = formData?.users?.indexOf(value);

    if (index === -1) {
      //  checking for unique domaains ----------
      if (checkUniqueDomains?.hasOwnProperty(domain)) {
        toast({
          description: "User with same domain already selected",
        });
        return;
      }

      setCheckUniqueDomains({ ...checkUniqueDomains, [domain]: true });

      setFormData((prev) => {
        return { ...prev, users: [...prev?.users, value] };
      });
    } else {
      setFormData((prev) => {
        const newArr = prev.users;
        newArr.splice(index, 1);
        return { ...prev, users: newArr };
      });

      setCheckUniqueDomains((prev) => {
        let obj = prev;
        delete obj[domain];
        return obj;
      });
    }
  };

  const handleFormClose = () => {
    setFormData({
      name: "",
      description: "",
      users: [],
    });
    setSearchedData([]);
    setCheckUniqueDomains({});
    dispatch(
      setDialogFormData({
        openDialogForm: false,
        DialogFormType: null,
      })
    );
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create Team</DialogTitle>
        <DialogDescription>
          Create a new team. Select users with unique domains.
        </DialogDescription>
      </DialogHeader>
      <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            className="col-span-3"
            required
            onChange={(e) => {
              handleChange(e.target.value, e.target.id);
            }}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Input
            id="description"
            className="col-span-3"
            onChange={(e) => {
              handleChange(e.target.value, e.target.id);
            }}
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="description" className="text-right ">
            Select Users ({formData?.users?.length} selected)
          </Label>

          <div className="w-full flex flex-col gap-2 relative col-span-3">
            <Input
              className="col-span-3"
              placeholder="Search users through name"
              onChange={handleInput}
            />
            {searchedData.length > 0 && (
              <ScrollArea className="h-40 w-full rounded-md border absolute">
                <div className="flex flex-col items-center w-full">
                  {searchedData?.map((e, i) => {
                    return (
                      <Label
                        className="flex items-center p-2 w-full gap-3"
                        key={"checker" + i}
                      >
                        {" "}
                        <Checkbox
                          id="terms"
                          checked={formData?.users?.includes(e?._id)}
                          onCheckedChange={() => {
                            handleAddUsers(e?._id, e?.domain);
                          }}
                        />{" "}
                        {e?.fullName} - {e?.domain.split(" ")[0]}
                      </Label>
                    );
                  })}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>

        <DialogFooter className="flex-row sm:justify-end justify-center gap-5">
          <Button onClick={handleFormClose}>Close</Button>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export function DialogForm() {
  const generalState = useSelector((state) => state.general);

  return (
    <Dialog open={generalState?.openDialogForm}>
      {generalState?.DialogFormType?.value === "updateUser" ? (
        <UserForm type="update" id={generalState?.DialogFormType?.id} />
      ) : generalState?.DialogFormType === "user" ? (
        <UserForm />
      ) : (
        <TeamForm />
      )}
    </Dialog>
  );
}
