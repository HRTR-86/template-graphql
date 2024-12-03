<?php declare(strict_types=1);

namespace App\Models\Auth;

use App\Models\Trn\TrnUserRole;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class AuthUser extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'trn_user';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'password',
        'name',
        'image_url',
        'created_by',
        'updated_by',
        'deleted_at',
    ];

    protected $casts = [
        'password' => 'hashed',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * @return HasMany
     */
    public function trnUserRole(): HasMany
    {
        return $this->hasMany(TrnUserRole::class, 'user_id', 'id');
    }
}
