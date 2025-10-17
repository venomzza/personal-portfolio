import type { NextPage } from 'next';
import { Anchor } from '../components/CustomHtml';
import { Button } from '@/components/ui/button';
import { useContext, useEffect, useState, memo } from 'react';
import { ProjectListContext } from '../context';
import { fetchProjectsStar } from '../helpers/helpers';
import { useRouter } from 'next/router';
import { Separator } from '@/components/ui/separator';
import ReactGA from 'react-ga4';
import dynamic from 'next/dynamic';

const TRACKING_ID = process.env.NEXT_PUBLIC_TRACKING_ID;
if (TRACKING_ID) ReactGA.initialize(TRACKING_ID);

// Memoized components for performance - defined first
const LoadingSpinner = memo(() => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
));
LoadingSpinner.displayName = 'LoadingSpinner';

// Dynamic imports for performance (client-side only) - defined after LoadingSpinner
const ProjectCard = dynamic(() => import('../components/ProjectCard'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const EmailBox = dynamic(() => import('../components/EmailBox'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const GitHubStats = dynamic(() => import('../components/GitHubStats'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const Skills = dynamic(() => import('../components/Skills'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

// Static image imports (more efficient for images)
import uopxLogo from '../images/uopx-phoenixbird-red.png';
import hackerrankLogo from '../images/HackerRank_logo.png';
import hmsLogo from '../images/100ms_logo.png';
import webmateLogo from '../images/webmate_logo.png';

const Home: NextPage = () => {
  const { projectList, setProjectList } = useContext(ProjectListContext);
  const [top6Projects, setTop6Projects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const clientRouter = useRouter();

  useEffect(() => {
    setTop6Projects(
      projectList.sort((a, b) => b.priority - a.priority).slice(0, 6)
    );
  }, [projectList]);

  useEffect(() => {
    // google analytics
    ReactGA.send({ hitType: 'pageview', page: '/', title: 'Home' });

    fetchProjectsStar()
      .then(updatedProjectsListWithStars => {
        setProjectList([...updatedProjectsListWithStars]);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [setProjectList]);

  const handleLinkClick = (action: string) => {
    ReactGA.event({
      category: 'Link.Click',
      action,
    });
  };

  return (
    <div className="relative my-10 sm:my-20">
      <div className="mt-10 sm:mt-20 flex">
        <div className="">
          <div className="text-4xl md:text-5xl font-medium">
            <div className="">Hey, I'm Baibhav Kumar</div>
            <div className="mt-4">
              <span className="hidden sm:inline-block mr-4">I'm a </span>
              <span className="text-primary">final year student</span>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <GitHubStats username="venomzza" />
          </div>
          <div className="text-muted-foreground font-light space-y-1 mt-8">
            <p className="">
              I’m a final-year Information Technology student from Manipal,
              India, passionate about web development and building real-world
              projects. I enjoy learning new technologies, creating responsive
              web applications, and improving my problem-solving skills through
              hands-on practice.
            </p>
          </div>
        </div>
      </div>

      {/* Experience Section removed per user request */}

      {/* Skills Section */}
      <div>
        <Skills />
      </div>

      {/* Projects Section */}
      <div className="mt-20 sm:mt-32">
        <div className="flex justify-between mb-10 items-center">
          <div className="text-4xl sm:text-5xl font-medium">Projects</div>
          <Button
            variant="outline"
            onClick={() => clientRouter.push('/projects')}
          >
            View all
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-auto auto-rows-fr gap-x-5 gap-y-5">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            top6Projects.map((project: any, i) => (
              <ProjectCard key={`${project.id}-${i}`} {...project} />
            ))
          )}
        </div>
      </div>

      {/* Contact email section */}
      <div className="mt-20 sm:mt-32">
        <div className="text-4xl sm:text-5xl font-medium">Contact Me</div>
        <div className="font-light text-muted-foreground mt-4 mb-10">
          I'm always open to new opportunities and connections. Feel free to
          reach out to me at{' '}
          <Anchor
            onClick={() => handleLinkClick('MailTo Link')}
            href="mailto:baibhavkumar@gmail.com"
          >
            baibhavkumar@gmail.com
          </Anchor>
          !
        </div>
        <EmailBox />
      </div>
    </div>
  );
};

export default memo(Home);
