<?php declare(strict_types=1);

namespace App\Usecases\Login;

use App\Usecases\InputBase;

class LoginInput extends InputBase
{
    public string $email;

    public string $password;

    /**
     * @param array $input
     */
    public function __construct(array $input)
    {
        $this->email    = $this->getStringTypeInput($input, 'email');
        $this->password = $this->getStringTypeInput($input, 'password');
    }
}
