import Container from '@/components/common/Container';
import { ProjectList } from '@/components/projects/ProjectList';
import { Separator } from '@/components/ui/separator';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { projects } from '@/config/Projects';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...getMetadata('/projects'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function ProjectsPage() {
  return (
    <Container className="py-8 sm:py-16">
      <div className="space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="space-y-3 text-center sm:space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Projects
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
            My projects and work across different technologies and domains.
          </p>
        </div>

        <Separator />

        {/* Projects */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              All Projects
              {projects.length > 0 && (
                <span className="text-muted-foreground ml-2 text-sm font-normal">
                  ({projects.length}{' '}
                  {projects.length === 1 ? 'project' : 'projects'})
                </span>
              )}
            </h2>
          </div>

          <ProjectList projects={projects} />
        </div>
      </div>
    </Container>
  );
}
