import React from 'react';

const styles = {
  pageContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 3.5rem)'
  }
};

export default function ErrorConnection(props) {
  return (
    <div style={styles.pageContent}>
      <div className="row">
        <div className="col text-center mb-5">
          <h3>
            Uh oh, an error has occurred! Please check your Internet connection.
          </h3>
          <p className="text-muted">
            <a href="#">Return to Home Page</a>
          </p>
        </div>
      </div>
    </div>
  );
}
