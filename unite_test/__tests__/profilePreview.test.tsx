import { render } from '@testing-library/react';
import ProfilePreview from "@/components/ProfilePreview";
import {TwitterIcon, LinkedInIcon, GitHubIcon} from "@/components/input-fields/Icons";

describe('ProfilePreview Component', () => {
    const mockProfile = {
        firstName: "Homayoun",
        lastName: "Mohammadi",
        email: "homayoun@gmail.com",
        description: "Frontend developer",
        imageURL: "/test/sample-image.webp"
    }

    const mockSocials = [
        {platform: 'x',url: "x.com/homayoun", Icon: TwitterIcon},
        {platform: 'linkedin',url: "linkedin.com/homayoun", Icon: LinkedInIcon},
        {platform: 'github',url: "github.com/homayoun", Icon: GitHubIcon},
    ];

    it('should render correctly and match snapshot', () => {
        const { asFragment: profileFragment } = render(<ProfilePreview profile={mockProfile} socials={mockSocials} />);

        expect(profileFragment()).toMatchSnapshot();
        
    })
})