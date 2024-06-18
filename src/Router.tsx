import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardView from './views/DashboardView';
import CreateProjectView from './views/projects/CreateProjectView';
import ProjectDetailsView from './views/projects/ProjectDetailsView';
import EditProjectView from './views/projects/EditProjectView';
import ProjectTeamView from './views/projects/ProjectTeamView';
import LoginView from './views/auth/LoginView';
import RegisterView from './views/auth/RegisterView';
import ConfirmAccountView from './views/auth/ConfirmAccountView';
import RequestNewCodeView from './views/auth/RequestNewCodeView';
import ForgotPasswordView from './views/auth/ForgotPasswordView';
import NewPasswordView from './views/auth/NewPasswordView';
import ProfileView from './views/profile/ProfileView';
import ChangePasswordView from './views/profile/ChangePasswordView';
import ProfileLayout from './layouts/ProfileLayout';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path='/' element={<DashboardView />} index />
                    <Route path='/projects/create' element={<CreateProjectView />} index />
                    <Route path='/projects/:projectId' element={<ProjectDetailsView />} index />
                    <Route path='/projects/:projectId/edit' element={<EditProjectView />} index />
                    <Route path='/projects/:projectId/team' element={<ProjectTeamView />} index />

                    <Route element={<ProfileLayout />}>
                        <Route path='/profile' element={<ProfileView />} />
                        <Route path='/profile/password' element={<ChangePasswordView />} />
                    </Route>
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path='/auth/login' element={<LoginView />}></Route>
                    <Route path='/auth/register' element={<RegisterView />}></Route>
                    <Route path='/auth/confirm-account' element={<ConfirmAccountView />}></Route>
                    <Route path='/auth/request-code' element={<RequestNewCodeView />}></Route>
                    <Route path='/auth/forgot-password' element={<ForgotPasswordView />}></Route>
                    <Route path='/auth/new-password' element={<NewPasswordView />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}