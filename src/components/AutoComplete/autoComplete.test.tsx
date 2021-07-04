import { render, fireEvent ,RenderResult, waitFor, cleanup } from "@testing-library/react";
import { AutoComplete, AutoCompleteProps, DataSourceType } from "./autoComplete";
import { config } from 'react-transition-group'

config.disabled = true;
const testArray = [
  {value: 'ab', number: 11},
  {value: 'abc', number: 1},
  {value: 'b', number: 4},
  {value: 'c', number: 15},
];

type userData = {
  login: string;
  url: string;
}
interface GithubApiData {
  items: userData[]
}

const handleSuggestion = (key: string) => {
  return fetch(`https://api.github.com/search/users?q=${key}`)
  .then(res => res.json())
  .then((res: GithubApiData) => {
    return res.items.map(item => ({
      value: item.login
    }));
  });
}

type testArrayType = {
  number: number;
}

const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {return testArray.filter(item => item.value.includes(query))},
  onSelect: jest.fn(),
  placeholder: 'auto-complete'
}

const templateProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {return testArray.filter(item => item.value.includes(query))},
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
  renderOptions: (item: DataSourceType) => {
    const data = item as DataSourceType<testArrayType>
    return (<>
      <h1>{data.value}</h1>
      <p>{data.number}</p>
    </>);
  }
}

const asyncProps: AutoCompleteProps = {
  fetchSuggestions: handleSuggestion,
  onSelect: jest.fn(),
  placeholder: 'auto-complete'
}

let wrapper: RenderResult, inputNode: HTMLInputElement
describe("test AutoComplete component", () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />);
    inputNode = wrapper.getByPlaceholderText("auto-complete") as HTMLInputElement;
  });
  it("test basic autoComplete behavior", async () => {
    expect(inputNode).toBeInTheDocument();
    fireEvent.change(inputNode, { target: {value: 'a'}});
    await waitFor(() => {
      expect(wrapper.getByText('ab')).toBeVisible();
    });
    expect(wrapper.container.querySelectorAll(".suggestion-item").length).toEqual(2);
    fireEvent.click(wrapper.getByText('ab'));
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11});
    expect(wrapper.queryByText('ab')).toBeNull();
    expect(inputNode.value).toEqual("ab");
  });
  it("should provide keyboard support", async () => {
    expect(inputNode).toBeInTheDocument();
    fireEvent.change(inputNode, { target: {value: 'a'}});
    await waitFor(() => {
      expect(wrapper.getByText('ab')).toBeVisible();
    });
    const firstResult = wrapper.queryByText('ab');
    const secondResult = wrapper.queryByText('abc');
    fireEvent.keyDown(inputNode, { keyCode: 40});
    expect(firstResult).toHaveClass("is-active");
    fireEvent.keyDown(inputNode, { keyCode: 40});
    expect(secondResult).toHaveClass("is-active");
    fireEvent.keyDown(inputNode, { keyCode: 38});
    expect(firstResult).toHaveClass("is-active");
    fireEvent.keyDown(inputNode, { keyCode: 13});
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11});
    expect(inputNode.value).toEqual("ab");
    expect(wrapper.queryByText('ab')).toBeNull();
  });
  it("click outside should hide the dropDown", async () => {
    expect(inputNode).toBeInTheDocument();
    fireEvent.change(inputNode, { target: {value: 'a'}});
    await waitFor(() => {
      expect(wrapper.getByText('ab')).toBeVisible();
    });
    fireEvent.click(document);
    expect(wrapper.queryByText('ab')).toBeNull();
  });
  it("renderOption should generate the right template", async () => {
    cleanup();
    wrapper = render(<AutoComplete {...templateProps} />);
    inputNode = wrapper.getByPlaceholderText("auto-complete") as HTMLInputElement;
    expect(inputNode).toBeInTheDocument();
    fireEvent.change(inputNode, { target: {value: 'a'}});
    await waitFor(() => {
      expect(wrapper.getByText('ab')).toBeVisible();
    });
    expect(wrapper.getByText(11)).toBeVisible();
    expect(wrapper.container.querySelectorAll(".suggestion-item").length).toEqual(2);
  });
  it("async fetchSuggestions should works fine", async () => {
    cleanup();
    wrapper = render(<AutoComplete {...asyncProps} />);
    inputNode = wrapper.getByPlaceholderText("auto-complete") as HTMLInputElement;
    expect(inputNode).toBeInTheDocument();
    fireEvent.change(inputNode, { target: {value: 'a'}});
    await waitFor(() => {
      setTimeout(() => {
        expect(wrapper.queryByText('A')).toBeVisible();
        expect(wrapper.container.querySelectorAll(".suggestion-item").length).toBeGreaterThan(1);
      }, 1000);
    });
  });
});