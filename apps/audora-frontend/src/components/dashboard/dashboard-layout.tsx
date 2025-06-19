import DashboardSidebar from '@/components/dashboard/dashboard-sidebar';
import DashboardMobileSidebar from '@/components/dashboard/dashboard-mobile-sidebar';
import DashboardContainer from '@/components/dashboard/dashboard-container';
import { Studio } from '@audora/types';
import StudioSettingsProvider from '@/providers/studio-settings-provider';

interface DashboardLayoutProps {
    studio: Studio;
    children: React.ReactNode;
}

export default function DashboardLayout({ studio, children }: DashboardLayoutProps) {
    return (
        <StudioSettingsProvider studio={studio}>
            <div className="bg-dashboard-bg flex h-full w-screen overflow-hidden">
                <DashboardSidebar studio={studio} />
                <DashboardMobileSidebar studio={studio} />
                <div className="m-1.5 flex-1 lg:m-3">
                    <DashboardContainer>{children}</DashboardContainer>
                </div>
            </div>
        </StudioSettingsProvider>
    );
}