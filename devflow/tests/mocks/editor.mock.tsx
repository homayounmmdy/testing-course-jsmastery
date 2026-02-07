const mockEditorMethods = {
  getMarkdown: jest.fn(() => ""),
  setMarkdown: jest.fn(),
  focus: jest.fn(),
};

const MockEditor = jest.fn(({ value, editorRef, fieldChange, ...props }) => {
  if (editorRef) {
    editorRef.current = {
      setMarkdown: jest.fn((markdown: string) => {
        fieldChange(markdown);
      }),
      getMarkdown: jest.fn(() => value),
    };
  }
  return (
    <textarea
      id="mdx-editor"
      data-testid="mdx-editor"
      defaultValue={value}
      onChange={fieldChange}
      placeholder="MDXEditor Mock"
      {...props}
    />
  );
});

export { mockEditorMethods, MockEditor };
