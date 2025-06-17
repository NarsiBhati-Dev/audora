import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { getStudio } from "@/actions/studio";
import authOptions from "@/lib/auth/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProjectsLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    const studio = await getStudio(session?.user?.accessToken as string);

    if (!studio) {
        redirect('/dashboard/studios/create');
    }

    return <DashboardLayout studio={studio}>{children}</DashboardLayout>;
}