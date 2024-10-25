import './Home.css';

function Home() {
    return (
        <div className='home-container-border'>
            {/* <h1>HOME</h1> */}
            <div className='home-container'>
                <img src="./Guide.png" alt="My Image" className="profile-image" />
                <h1 >นาย วรโชติ วังหา</h1>
                <h2 >66026164</h2>
                <div>
                    วันเกิด: 18 กันยายน พ.ศ.2547
                    ที่อยู่: 
                    เบอร์โทรศัพท์: 081-123-4567
                    อีเมล: worachot.wan@spumail.com
                    ประวัติการศึกษา:
                    จบจาก เทคนิคสระแก้ว สาขาสารสนเทศ
                </div>

            </div>
        </div>

    );
}

export default Home;
