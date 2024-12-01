<?php declare(strict_types=1);

namespace App\Usecases\Login;

use App\Usecases\InputBase;

class SignUpInput extends InputBase
{
    public string $name;

    public string $email;

    public string $password;

    /**
     * @param array $input
     */
    public function __construct(array $input)
    {
        $this->name     = $this->getStringTypeInput($input, 'name');
        $this->email    = $this->getStringTypeInput($input, 'email');
        $this->password = $this->getStringTypeInput($input, 'password');
    }
}
