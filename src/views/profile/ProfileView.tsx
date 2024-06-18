import ProfileForm from "@/components/profile/ProfileForm";
import Spinner from "@/components/spinner/Spinner";
import { userAuth } from "@/hooks/useAuth";

export default function ProfileView() {

    const { data, isLoading } = userAuth();

    if (isLoading) return <Spinner />;

    if (data) return <ProfileForm data={data} />;
}
