import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from '@/components/ui/card';

export default function DataDeletionPage() {
  return (
    <>
      <CardHeader>
        <CardTitle>Data Deletion Request</CardTitle>
        <CardDescription>
          Instructions for requesting the deletion of your data.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <p>
          At ConnectIQ, we respect your right to privacy and to control your
          personal information.
        </p>

        <p>
          In accordance with Meta platform policies (Facebook and Instagram) and
          privacy regulations such as the GDPR, you may request the complete
          deletion of any data we have collected through your connection with
          our applications.
        </p>

        <p>
          To request data deletion, please send an email to{' '}
          <a
            href="mailto:privacy@connectiq.app"
            className="underline"
          >
            privacy@connectiq.app
          </a>{' '}
          with the subject line <strong>&quot;Data Deletion Request&quot;</strong>.
          We will contact you to verify your identity and process your request
          within the time frame required by law.
        </p>

        <p>
          Once the request has been processed, all linked and analytics-related
          data associated with your account will be permanently removed from
          our systems.
        </p>
      </CardContent>
    </>
  );
}
