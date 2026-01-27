import {render, screen, fireEvent} from '@testing-library/react'
import {ImageUpload} from "@/components/input-fields/ImageUpload";

describe("ImageUpload", () => {
    const mockHandleChange = jest.fn();

    it('calls handleChange with the correct file when a file is selected', () => {
        render(<ImageUpload handleChange={mockHandleChange}/>);

        const file = new File(['dummy content'], 'profile.png', {type: 'image/png'});

        const fileInput = screen.getByTestId('file-upload');
        fireEvent.change(fileInput, {target: {file: [file]}});

        expect(mockHandleChange).toHaveBeenCalledTimes(1);
        expect(mockHandleChange).toHaveBeenCalledWith(
            expect.objectContaining({
                target: expect.objectContaining({
                    file: expect.arrayContaining([file])
                })
            })
        )
    })

    it('calls handleChange when a single valid file is dropped', () => {
        render(<ImageUpload handleChange={mockHandleChange}/>);

        const file = new File(['dummy content'], 'profile.png', {type: 'image/png'});

        const dropZone = screen.getByTestId('drop-zone');

        if (dropZone) fireEvent.drop(dropZone, {dataTransfer:{files: [file]}});

        expect(mockHandleChange).toHaveBeenCalled();
    })

    it('does not call handleChange when a single valid file is dropped', () => {
        render(<ImageUpload handleChange={mockHandleChange}/>);

        const file = new File(['dummy content'], 'document.pdf', {type: 'application/pdf'});

        const dropZone = screen.getByTestId('drop-zone');

        if(dropZone) fireEvent.drop(dropZone,{dataTransfer:{files: [file]}} );

        expect(mockHandleChange).not.toHaveBeenCalled();
    })

    it('clears the error message after a successful file has been uploaded', () => {
        render(<ImageUpload handleChange={mockHandleChange}/>);

        const file1 = new File(['dummy content'], 'profile.png', {type: 'image/png'});
        const file2 = new File(['dummy2 content'], 'profile2.jpeg', {type: 'image/jpeg'});

        const dropZone = screen.getByTestId('drop-zone');
        if(dropZone) fireEvent.drop(dropZone,{dataTransfer:{files: [file1 , file2]}} );

        expect(screen.getByTestId('error-message')).toBeInTheDocument();

        const validFile = new File(['dummy content'], 'profile.png', {type: 'image/png'});
        if(dropZone) fireEvent.drop(dropZone,{dataTransfer:{files: [validFile]}} );

        expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();

    })
})
