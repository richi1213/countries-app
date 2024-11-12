import {
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { AddCountryButton, SortButton } from 'components/ui/buttons';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardButtonsWrapper,
} from 'components/ui/cards';
import styles from '@/pages/countries/components/list/CountryList.module.css';
import ReusableModal from 'components/ui/modals/ReusableModal';
import { Lang } from '@/types';
import { BaseCountryData, ResponseData } from '@/pages/countries/api/types';
import {
  deleteData,
  editData,
  getData,
} from '@/pages/countries/api/database/services';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NewCountryForm from 'components/ui/forms/NewCountryForm';
import { translations } from '@/components/ui/modals/translations';
import EditCountryForm from 'components/ui/forms/EditCountryForm';
import { reducer, State } from '@/pages/countries/reducers/countryReducer';
import { useMutation, useInfiniteQuery } from '@tanstack/react-query';
import Error from '@/pages/errors/Error';
import Loading from 'components/ui/loader/Loading';
import debounce from 'lodash.debounce';
import { useIntersection } from '@mantine/hooks';
import { useVirtualizer } from '@tanstack/react-virtual';

const CountryList: React.FC = () => {
  const { lang = 'en' } = useParams<{ lang: Lang }>();
  const [isAddNewCountryModalOpen, setIsAddNewCountryModalOpen] =
    useState(false);
  const [isEditCountryModalOpen, setIsEditCountryModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] =
    useState<BaseCountryData | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const sortOrder = searchParams.get('sort') || '-likes';
  const [isAscending, setIsAscending] = useState(false);

  useEffect(() => {
    setIsAscending(sortOrder === 'likes');
  }, [sortOrder]);

  const pageSize = Number(searchParams.get('per_page')) || 9;

  const updateSearchParams = (pageParam: number) => {
    setSearchParams({
      sort: sortOrder,
      page: pageParam.toString(),
      per_page: pageSize.toString(),
    });
  };

  const {
    data,
    status,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isFetching,
    refetch,
  } = useInfiniteQuery<ResponseData>({
    queryKey: ['baseCountries'],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await getData(sortOrder, pageParam as number, pageSize);
      updateSearchParams(pageParam as number);
      return data;
    },
    getNextPageParam: (lastFetchedPage) => lastFetchedPage.nextOffset,
    initialPageParam: 1,
  });

  useEffect(() => {
    refetch();
  }, [sortOrder, refetch]);

  const { mutate: deleteCountry } = useMutation<void, Error, string>({
    mutationFn: deleteData,
    onError: (error) => {
      console.error('Error deleting country:', error);
    },
  });

  const { mutate: addLikes } = useMutation({
    mutationFn: editData,
    onError: (error) => {
      console.error('Error updating country data:', error);
    },
  });

  const countriesData = useMemo(
    () =>
      data?.pages?.flatMap((page) =>
        page.data.map((country: BaseCountryData) => ({
          id: country?.id,
          name: country?.name,
          flag: country?.flag,
          population: country?.population,
          capital: country?.capital,
          photo: country?.photo,
          likes: country?.likes,
        })),
      ) as BaseCountryData[],
    [data],
  );

  const lastCountryRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const { ref, entry } = useIntersection({
    root: lastCountryRef.current,
    threshold: 1,
  });

  const rowVirtualizer = useVirtualizer({
    count: countriesData ? countriesData.length : 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 400,
    overscan: 3,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [entry, hasNextPage, isFetchingNextPage, fetchNextPage, rowVirtualizer]);

  const initialCountries: State = {
    countries: [],
  };

  const [state, dispatch] = useReducer(reducer, initialCountries);

  const debouncedAddLikes = useCallback(
    (id: string, updatedLikes: number) => {
      const debouncedFn = debounce((id: string, updatedLikes: number) => {
        addLikes({
          countryId: id,
          updatedData: { likes: updatedLikes },
        });
      }, 3000);

      debouncedFn(id, updatedLikes);
    },
    [addLikes],
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Error
        customMessage='Failed to load countries.'
        customStatusText={error.message}
      />
    );
  }

  const handleLike = (id: string) => {
    dispatch({
      type: 'country/liked',
      payload: { id },
    });

    const likedCountry = state.countries.find((country) => country.id === id);
    const updatedLikes = likedCountry ? likedCountry.likes + 1 : 1;

    debouncedAddLikes(id, updatedLikes);
  };

  const handleDelete = async (
    event: MouseEvent<HTMLButtonElement>,
    countryId: string,
  ) => {
    event.preventDefault();
    event.currentTarget.blur();

    const country = state.countries.find((country) => country.id === countryId);

    if (country) {
      dispatch({
        type: 'country/deleted',
        payload: { id: countryId },
      });
    }

    deleteCountry(countryId);
  };

  const handleAddCountry = (newCountry: BaseCountryData) => {
    dispatch({
      type: 'country/added',
      payload: { country: { ...newCountry, likes: 0 } },
    });
  };

  const handleEditCountry = (
    event: MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    event.preventDefault();
    const countryToEdit = state.countries.find((country) => country.id === id);
    if (countryToEdit) {
      setSelectedCountry(countryToEdit);
      setIsEditCountryModalOpen(true);
    }
  };

  const handleEdit = (updatedData: Partial<BaseCountryData>) => {
    if (selectedCountry && selectedCountry.id) {
      dispatch({
        type: 'country/edited',
        payload: { id: selectedCountry.id, updatedData },
      });
      setSelectedCountry(null);
      setIsEditCountryModalOpen(false);
    }
  };

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'likes' ? '-likes' : 'likes';
    setSearchParams({ sort: newSortOrder });
  };

  console.log('countries data', countriesData);

  console.log('data', data);

  return (
    <div>
      <AddCountryButton
        handleOpenModal={() => setIsAddNewCountryModalOpen(true)}
      />
      <SortButton onSort={toggleSortOrder} isAscending={isAscending} />
      {status === 'pending' ? (
        <Loading />
      ) : (
        <div
          ref={parentRef}
          className={styles.countryList}
          style={{
            height: `500px`,
            width: `100%`,
            overflow: 'auto',
          }}
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const isLoaderRow = virtualRow.index > countriesData.length - 1;
              const country = countriesData[virtualRow.index];

              return (
                <div
                  className={styles.countryItem}
                  key={virtualRow.index}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {isLoaderRow ? (
                    hasNextPage ? (
                      'Loading more...'
                    ) : (
                      'Nothing more to load'
                    )
                  ) : (
                    <div
                      key={`${country.id}`}
                      ref={
                        virtualRow.index === countriesData.length - 1
                          ? ref
                          : undefined
                      }
                    >
                      <Card>
                        <Link to={`${country.name.en}`} className={styles.link}>
                          <CardHeader
                            photo={country.photo}
                            name={country.name[lang]}
                          />
                          <CardContent
                            name={country.name[lang]}
                            population={country.population}
                            capitalCity={
                              country.capital[lang] ?? 'Unknown Capital'
                            }
                          />
                          <CardFooter
                            flag={country.flag}
                            countryName={country.name[lang]}
                          />
                        </Link>
                        <CardButtonsWrapper
                          likeButtonProps={{
                            icon: <FavoriteBorderIcon />,
                            initialLikes: country.likes,
                            onLike: () => handleLike(country.id as string),
                          }}
                          editButtonProps={{
                            onEdit: (event) =>
                              handleEditCountry(event, country.id as string),
                          }}
                          deleteButtonProps={{
                            onDelete: (event) =>
                              handleDelete(event, country.id as string),
                          }}
                        />
                      </Card>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div>
        {isFetching && !isFetchingNextPage ? 'Background Updating...' : null}
      </div>

      <ReusableModal
        open={isEditCountryModalOpen && selectedCountry !== null}
        handleClose={() => setIsEditCountryModalOpen(false)}
        title={translations[lang].editCountry}
      >
        <EditCountryForm
          existingCountry={selectedCountry!}
          handleClose={() => setIsEditCountryModalOpen(false)}
          handleEditCountry={handleEdit}
        />
      </ReusableModal>

      <ReusableModal
        open={isAddNewCountryModalOpen}
        handleClose={() => setIsAddNewCountryModalOpen(false)}
        title={translations[lang].addNewCountry}
      >
        <NewCountryForm
          handleClose={() => setIsAddNewCountryModalOpen(false)}
          handleAddCountry={handleAddCountry}
          existingCountries={state.countries}
        />
      </ReusableModal>
    </div>
  );
};

export default CountryList;
