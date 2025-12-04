import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'

const LoginPage = () => {
    return (
        <div className="bg-[#0b1215] h-full w-full flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center">
                <h1>⚡ExziApp</h1>
                <p>Your companion in financial management</p>
            </div>
            <TabGroup defaultIndex={0} className="w-1/3 h-3/4 border-4 border-[#101a1e] rounded-lg">
                <TabList as="div" className="w-full h-[10%] bg-[#0b1215] p-2 rounded-lg">
                    <Tab className="h-full w-1/2 rounded-lg data-[selected]:bg-[#adc9d4] data-[selected]:text-black transition duration-300 ease-in-out">Login</Tab>
                    <Tab className="h-full w-1/2 rounded-lg data-[selected]:bg-[#adc9d4] data-[selected]:text-black transition duration-300 ease-in-out">Register</Tab>
                </TabList>
                <TabPanels className="h-[90%]">
                    <TabPanel className="h-full">
                        <LoginForm />
                    </TabPanel>
                    <TabPanel className="h-full">
                        <RegistrationForm />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    )
}

export default LoginPage