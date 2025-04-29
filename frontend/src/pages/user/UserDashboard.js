import React from 'react';

const UserDashboard = () => {
  return (
    <div className="container my-5">
      <h1 className="mb-4">User Dashboard</h1>
      
      <div className="row g-4">
        {/* Welcome Card */}
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Selamat datang!</h5>
              <p className="card-text">
                Ini adalah dashboard user tempat kamu bisa melihat informasi terkait akun, makanan favorit, dan review yang kamu buat.
              </p>
            </div>
          </div>
        </div>

        {/* Statistik Cards */}
        <div className="col-md-4">
          <div className="card text-bg-primary shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">10</h5>
              <p className="card-text">Makanan Favorit</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card text-bg-success shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">5</h5>
              <p className="card-text">Review yang Dibuat</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card text-bg-warning shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">3</h5>
              <p className="card-text">Restoran Favorit</p>
            </div>
          </div>
        </div>

        {/* Aksi */}
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <a href="/foods" className="btn btn-outline-primary mx-2">Lihat Makanan</a>
              <a href="/reviews" className="btn btn-outline-success mx-2">Lihat Review</a>
              <a href="/settings" className="btn btn-outline-secondary mx-2">Pengaturan Akun</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
