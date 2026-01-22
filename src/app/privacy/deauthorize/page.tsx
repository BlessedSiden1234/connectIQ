import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from '@/components/ui/card';

export default function DeauthorizePage() {
  return (
    <>
      <CardHeader>
        <CardTitle>Application Deauthorization</CardTitle>
        <CardDescription>
          Information about the deauthorization process.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p>
          If you have reached this page, it is likely that you removed
          ConnectIQ’s access from your Facebook or Instagram settings.
        </p>

        <p className="mt-4">
          We have received the notification and, if any access data was
          associated with your account, it has been removed from our systems.
          No further access to your social media data will occur.
        </p>

        <p className="mt-4">
          Thank you for using ConnectIQ.
        </p>
      </CardContent>
    </>
  );
}
