const UserProfile = (props) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', margin: '15px', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ color: '#2c3e50', fontSize: '24px', marginBottom: '10px' }}>{props.name}</h2>
      <p style={{ margin: '5px 0' }}>Age: <span style={{ fontWeight: 'bold', color: '#e74c3c' }}>{props.age}</span></p>
      <p style={{ margin: '5px 0', color: '#7f8c8d', fontStyle: 'italic' }}>Bio: {props.bio}</p>
    </div>
  );
};

export default UserProfile;