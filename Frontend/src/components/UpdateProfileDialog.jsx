
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {

    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        profilePhotoFile: null,
        resumeFile: null
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const handleProfilePhotoChange = (e) => {
        setInput(prev => ({ ...prev, profilePhotoFile: e.target.files[0] }));
    };

    const handleResumeChange = (e) => {
        setInput(prev => ({ ...prev, resumeFile: e.target.files[0] }));
    };

    const uploadProfilePhoto = async () => {
        if (!input.profilePhotoFile) return null;

        const formData = new FormData();
        formData.append("file", input.profilePhotoFile);

        try {
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    // 'Content-Type' not set explicitly for FormData
                },
                withCredentials: true
            });
            return res.data;
        } catch (error) {
            console.error("Profile photo upload failed", error);
            throw error;
        }
    };

    const uploadResume = async () => {
        if (!input.resumeFile) return null;

        const formData = new FormData();
        formData.append("file", input.resumeFile);

        try {
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                withCredentials: true
            });
            return res.data;
        } catch (error) {
            console.error("Resume upload failed", error);
            throw error;
        }
    };

    const updateProfileInfo = async (inputData) => {
        // Convert skills string to array by splitting commas and trimming
        const skillsArray = inputData.skills.split(',').map(s => s.trim()).filter(s => s.length > 0);

        const payload = {
            fullname: inputData.fullname,
            email: inputData.email,
            phoneNumber: inputData.phoneNumber,
            bio: inputData.bio,
            skills: skillsArray,
        };

        try {
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, payload, {
                withCredentials: true
            });
            return res.data;
        } catch (error) {
            console.error("Profile info update failed", error);
            throw error;
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Upload profile photo first (if any)
            if (input.profilePhotoFile) {
                const dataPhoto = await uploadProfilePhoto();
                if (dataPhoto?.success) {
                    dispatch(setUser(dataPhoto.user));
                    toast.success("Profile photo updated");
                }
            }

            // Upload resume (if any)
            if (input.resumeFile) {
                const dataResume = await uploadResume();
                if (dataResume?.success) {
                    dispatch(setUser(dataResume.user));
                    toast.success("Resume updated");
                }
            }

            // Update profile info (name, email, bio, skills, etc)
            const dataInfo = await updateProfileInfo(input);
            if (dataInfo?.success) {
                dispatch(setUser(dataInfo.user));
                toast.success("Profile info updated");
            }

            // setOpen(false);


        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating profile");
        } finally {
            // ✅ Forcefully reset loader first
            setLoading(false);
            // ✅ Then close modal
            setTimeout(() => {
                setOpen(false);
            }, 100); // slight delay helps flush UI state
        }
    };


    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="email" className="text-right">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="number" className="text-right">Number</Label>
                                <Input
                                    id="number"
                                    name="number"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="bio" className="text-right">Bio</Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="skills" className="text-right">Skills</Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-2">
                                <Label htmlFor="profilePhoto" className="text-right">Profile-Photo</Label>
                                <Input
                                    id="profilePhoto"
                                    name="profilePhoto"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfilePhotoChange}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="file" className="text-right">Resume</Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={handleResumeChange}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="submit"
                                className="w-full my-4"
                                disabled={loading}
                            >
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {loading ? "Please wait" : "Update"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog
