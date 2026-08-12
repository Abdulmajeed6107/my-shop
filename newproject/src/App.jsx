import AppRoute from "./routes/AppRoutes";
import WhatsAppButton from "./components/WhatsAppButton";
import NavigationProgressProvider from "./components/NavigationProgress";

export default function App() {
    return (
        <NavigationProgressProvider>
            <AppRoute />
            <WhatsAppButton />
        </NavigationProgressProvider>
    );
}