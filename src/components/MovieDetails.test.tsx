import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MovieDetails } from "./MovieDetails";

// Mock data for tests
const mockMovie = {
  Title: "Test Movie",
  Year: "2023",
  Actors: "John Doe, Jane Smith",
  Poster: "test-poster.jpg",
  Runtime: "120 min",
  imdbRating: "8.5",
  Plot: "Test plot",
  Released: "01 Jan 2023",
  Director: "Test Director",
  Genre: "Action",
  imdbID: "tt1234567",
};

// Mock fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockMovie),
  })
) as jest.Mock;

// Mock environment variable
process.env.REACT_APP_API_KEY = "test-api-key";

describe("MovieDetails Component", () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test component rendering
  test("renders loading state initially", () => {
    render(
      <MovieDetails
        selectedId="tt1234567"
        onClose={() => {}}
        onAddWatched={() => {}}
      />
    );
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  // Test API data fetching and display
  test("fetches and displays movie details", async () => {
    render(
      <MovieDetails
        selectedId="tt1234567"
        onClose={() => {}}
        onAddWatched={() => {}}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(mockMovie.Title)).toBeInTheDocument();
      expect(screen.getByText(mockMovie.Plot)).toBeInTheDocument();
    });
  });

  // Test rating functionality
  test("enables add button when rating is selected", async () => {
    const onAddWatchedMock = jest.fn();

    render(
      <MovieDetails
        selectedId="tt1234567"
        onClose={() => {}}
        onAddWatched={onAddWatchedMock}
      />
    );

    const ratingStars = await waitFor(() => screen.getAllByRole("button"));
    fireEvent.click(ratingStars[4]); // Select 5-star rating
    expect(screen.getByText("+ add to the list")).toBeInTheDocument();
  });

  // Test close functionality
  test("closes on escape key press", async () => {
    const onCloseMock = jest.fn();

    render(
      <MovieDetails
        selectedId="tt1234567"
        onClose={onCloseMock}
        onAddWatched={() => {}}
      />
    );

    fireEvent.keyDown(document, { code: "Escape" });
    expect(onCloseMock).toHaveBeenCalled();
  });

  // Test adding movie to watched list
  test("adds movie to watched list with correct data", async () => {
    const onAddWatchedMock = jest.fn();

    render(
      <MovieDetails
        selectedId="tt1234567"
        onClose={() => {}}
        onAddWatched={onAddWatchedMock}
      />
    );

    const ratingStars = await screen.findAllByRole("button");
    fireEvent.click(ratingStars[4]);
    fireEvent.click(screen.getByText("+ add to the list"));

    await waitFor(() => {
      expect(onAddWatchedMock).toHaveBeenCalledWith(
        expect.objectContaining({
          imdbID: mockMovie.imdbID,
          Title: mockMovie.Title,
          userRating: 5,
        })
      );
    });
  });
});
