import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "first meetup",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgNorHI5MfAxxgTEj2hZB77e4YER2HrjSa7CpfNz4Gwbjaz7Bq6ghEQ2J0Y5GXLtfWBJk&usqp=CAU",
//     address: "some adress 5 , 2nd block",
//     description: "this is first meetup of friends",
//   },
//   {
//     id: "m2",
//     title: "second meetup",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhQ_0XaLshk7f6D98jX0NIuSwkdDnLE0dHMYg4KLreyL0-R7FSBGLp3ZX29hr5iNl70dw&usqp=CAU",
//     address: "some adress 6 , 3rd block",
//     description: "this is second meetup of collaegues",
//   },
// ];

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

//the below function runs for every request hit the server so we dont need revalidate
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   //fetch data from API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://charan:Mangodbpass@cluster0.gg6vjr2.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
