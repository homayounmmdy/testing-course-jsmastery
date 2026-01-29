import {SocialFields} from "@/components/input-fields/SocialFields";
import {useState} from "react";
import {userEvent} from '@testing-library/user-event';
import {render, screen} from '@testing-library/react'
import {SocialLink} from "@/types/global";
import {TwitterIcon, LinkedInIcon, GitHubIcon} from "@/components/input-fields/Icons";

const TestWrapper = ({initialSocials}: { initialSocials: SocialLink[] }) => {
    const [socials, setSocials] = useState(initialSocials);

    const onSocialChange = (index: number, value: string) => {
        setSocials((prevSocial) => prevSocial.map((social, i) => i === index ? {...social, url: value} : social))
    }

    return <SocialFields socials={socials} onChange={onSocialChange}/>
}

describe("SocialFields component", () => {
    const user = userEvent.setup();

    const mockSocials = [
        {platform: 'x',url: "", Icon: TwitterIcon},
        {platform: 'linkedin',url: "", Icon: LinkedInIcon},
        {platform: 'github',url: "", Icon: GitHubIcon},
    ];

    it('should show an error message fro an invalid URL immediately', async () => {
        render(<TestWrapper initialSocials={mockSocials} />);

        const linkedinInput = screen.getByPlaceholderText(/linkedin\.com\/username/i);

        await user.type(linkedinInput, 'github.com/invalid');

        expect(screen.getByText(/Please enter a valid linkedin URL/i)).toBeInTheDocument();
    });

    it('should clear error when valid URL is entered', async () => {
        render(<TestWrapper initialSocials={mockSocials} />);

        const linkedinInput = screen.getByPlaceholderText(/linkedin\.com\/username/i);

        await user.type(linkedinInput, 'github.com/invalid');
        expect(screen.getByText(/Please enter a valid linkedin URL/i)).toBeInTheDocument();

        await user.clear(linkedinInput);
        await user.type(linkedinInput, 'linkedin.com/homayounmmdy');

        expect(screen.queryByText(/Please enter a valid linkedin URL/i)).not.toBeInTheDocument();
    });

    it('should not show error for empty input' , async () => {
        render(<TestWrapper initialSocials={mockSocials} />);

        const linkedinInput = screen.getByPlaceholderText(/linkedin\.com\/username/i);

        await user.type(linkedinInput, 'some text');
        await user.clear(linkedinInput);

        expect(screen.queryByText(/Please enter a valid linkedin URL/i)).not.toBeInTheDocument();
    })
})