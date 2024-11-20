import './index.css'
import { Redirect, Route, Switch } from 'wouter'
import { NotifsProvider } from './contexts/notifContext'
import { UserProvider } from './contexts/userContext'
import Header from './components/Header'
import Posts from './views/Posts'
import NotFound from './views/404'
import Error from './views/500'
import CreatePost from './views/CreatePost'
import PostPage from './views/PostPage'
import Footer from './components/Footer'
import { SearchProvider } from './contexts/searchContext'
import Auth from './views/Auth'
import Profile from './views/Profile'
import ProfilePage from './views/ProfilePage'

function App() {
    return (
        <div className='flex flex-col min-h-screen'>
            <NotifsProvider>
                <UserProvider>
                    <SearchProvider>
                        <Header />

                        <Switch>
                            <Route path="/">
                                <Redirect to="/posts" />
                            </Route>

                            <Route path="/Auth">
                                <Auth />
                            </Route>

                            <Route path="/profiles/:userId">
                                <ProfilePage />
                            </Route>
                            
                            <Route path="/profile">
                                <Profile />
                            </Route>

                            <Route path="/posts">
                                <Posts />
                            </Route>

                            <Route path="/posts/:postId">
                                <PostPage />
                            </Route>

                            <Route path="/new">
                                <CreatePost />
                            </Route>

                            <Route path="/500">
                                <Error />
                            </Route>

                            <Route>
                                <NotFound />
                            </Route>
                        </Switch>

                        <Footer />
                    </SearchProvider>
                </UserProvider>
            </NotifsProvider>
        </div>
    )
}

export default App
