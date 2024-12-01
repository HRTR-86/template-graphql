<?php declare(strict_types=1);

namespace App\Enums\Mst;

enum Role: int
{
    case ADMINISTRATOR = 1;
    case DEVELOPER     = 2;
    case GENERAL_USER  = 3;
}
