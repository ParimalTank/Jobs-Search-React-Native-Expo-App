import { Stack, useRouter, useSearchParams, } from 'expo-router';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components';
import useFetch from '../../hook/useFetch';
import { COLORS, icons, SIZES } from "../../constants";
import { RefreshControl } from 'react-native-gesture-handler';
import { useCallback, useState } from 'react';

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {

    const params = useSearchParams();
    const router = useRouter();


    const { data, isLoading, error, refetch } = useFetch('job-details', {
        job_id: params.id
    })

    const [refreshing, setRefreshing] = useState(false);

    const [activeTab, setActiveTab] = useState(tabs[0]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    }, []);

    const displayTabContent = () => {
        switch (activeTab) {
            case "Qualifications":
                return <Specifics
                    title="Qualifications"
                    points={data[0].job_highlights?.qualifications ?? ['N/A']}
                />
                break;
            case "About":
                return <JobAbout info={data[0].job_description ?? "No data provided"} />
                break;
            case "Responsibilities":
                return <Specifics
                    title="Responsibilities"
                    points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
                />
                break;
            default:
                break;
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension="60%"
                            handlePress={() => router.push("/")}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension="60%"
                        />
                    ),
                    headerTitle: ''
                }}
            />
            <>
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    {
                        isLoading ? (
                            <ActivityIndicator size='large' color={COLORS.primary} />
                        ) : error ? (
                            <Text>Something went wrong</Text>
                        ) : data.length === 0 ? (
                            <Text>No Data</Text>
                        ) : (
                            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                                <Company
                                    companyLogo={data[0].employer_logo}
                                    jobTitle={data[0].job_title}
                                    companyName={data[0].employer_name}
                                    location={data[0].job_country}
                                />
                                <JobTabs
                                    tabs={tabs}
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                />

                                {displayTabContent()}
                            </View>
                        )
                    }
                </ScrollView>

                <JobFooter
                    url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results/'}
                />
            </>
        </SafeAreaView>
    )
}

export default JobDetails