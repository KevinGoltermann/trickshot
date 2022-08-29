import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { datadogRum } from '@datadog/browser-rum';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);
  
  if(isSSR) return null;

  datadogRum.init({
    applicationId: 'eecf2d04-10bc-4798-87ae-1fb06c0ff642',
    clientToken: 'pub4794e32a101517ed468b2c7a354807e4',
    site: 'datadoghq.com',
    service:'trickshot',
    env:'prod',
    // Specify a version number to identify the deployed version of your application in Datadog 
    // version: '1.0.0',
    sampleRate: 100,
    premiumSampleRate: 100,
    trackInteractions: true,
    defaultPrivacyLevel:'mask-user-input',
    trackFrustrations: true
});
    
datadogRum.startSessionReplayRecording();

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
      <div className='xl:w-[1200px] m-auto overflow-hidden h-[100vh]'>
        <Navbar />
        <div className=' flex gap-6 md:gap-20'>
          <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
            <Sidebar />
          </div>
          <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1'>
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}

export default MyApp
