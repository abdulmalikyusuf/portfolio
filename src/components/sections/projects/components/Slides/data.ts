import devLinks from '../../img/devLinks.webp'
import Nayak from '../../img/nayak-fashion-e-commerce.vercel.app.webp'
import GSF from '../../img/grow-strong-foundation.vercel.app.webp'
import Telex from '../../img/telex.im.webp'
import HelpMeOut from '../../img/helpmeout-chrome-extension.webp'
import Africore from '../../img/africore.vercel.app.jpg'

const data = [
  {
    name: 'devLinks',
    location: 'A customizable profile link-sharing platform',
    description:
      'DevLinks allows users to create a personalized profile by adding their name, email, avatar, and links to various social media accounts. Once set up, users can share a live preview of their profile, giving others easy access to their connected platforms through a single, streamlined page.',
    image: devLinks,
    url: 'https://hng-11-stage05b.vercel.app',
  },
  {
    name: 'Nayak E-Commerce',
    location:
      'An e-commerce storefront built with a component-driven development approach',
    description:
      'Nayak is a fully functional e-commerce website created to explore component architecture and design consistency using Storybook. It includes core features like a dynamic products listing page, product detail view, cart functionality, and user authentication with sign-in and sign-out flows.',
    image: Nayak,
    url: 'https://nayak-fashion-e-commerce.vercel.app/',
  },
  {
    name: 'GSF',
    location:
      'A content-managed website and admin dashboard for a nonprofit organization',
    description:
      'GSF is a website built for an NGO to showcase its mission, events, and activities. The platform includes a custom admin dashboard that allows authorized users to create and manage blog posts, update gallery images, and handle user access—making content updates seamless and non-technical.',
    image: GSF,
    url: 'https://gsf.org.ng/',
  },
  {
    name: 'Telex',
    location: 'AI-powered team collaboration—built during the HNG Internship',
    description:
      'Telex is a modern collaboration platform designed to bring the best of tools like Slack—messaging, channels, and teamwork—while introducing intelligent AI agents that help businesses scale. These agents automate critical tasks such as monitoring, reporting, and operational scaling, freeing teams to focus on high-impact work.',
    image: Telex,
    url: 'https://telex.im/',
  },
  {
    name: 'HelpMeOut Extension',
    location: 'A browser extension for seamless screen capture and recording',
    description:
      'HelpMeOut is a browser extension that allows users to take screenshots or record videos (with audio) of a browser tab, application window, or entire screen. The project focuses on delivering a smooth user experience within the browser environment, with an intuitive interface and reliable media capture APIs.',
    image: HelpMeOut,
    url: 'https://github.com/abdulmalikyusuf/HelpMeOut-Browser-Extension',
  },
  {
    name: 'Africore',
    location: 'A clean, static website built with modern UI components',
    url: 'https://africore.vercel.app/',
    description:
      'Africore is a static website designed to present information clearly and professionally. The site features structured content sections and clean navigation, with a focus on visual clarity and performance.',
    image: Africore,
  },
]

export default data
