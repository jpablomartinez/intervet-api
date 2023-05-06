class Admin {
    admin_id?: string;
    name!: string;
    lastname!: string;
    rut!: string;
    type!: string;
    backup_email!: string;
    phone!: string;
    birthdate!: Date;

    constructor(
        admin_id: string,
        name: string,
        lastname: string,
        rut: string,
        type: string,
        backup_email: string,
        phone: string,
        birthdate: Date
    ) {
        this.admin_id = admin_id;
        this.name = name;
        this.lastname = lastname;
        this.rut = rut;
        this.type = type;
        this.backup_email = backup_email;
        this.phone = phone;
        this.birthdate = birthdate;
    }

}

export default Admin;